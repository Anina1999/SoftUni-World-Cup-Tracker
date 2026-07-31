import { Router } from "express";
import { getErrorMessage } from "../utils/error.utils.js";
import { createMatchSchema } from "../schemas/match.schema.js";
import { matchService } from "../../services/index.js";

const matchController = Router();

export function getMatchPage(req, res) {
    const stageOptions = getStageOptions();
    res.render('match/create', { stageOptions })
}

function getStageOptions(match = {}) {
    const stages = ['Group Stage', 'Round of 16', 'Quarter-finals', 'Semi-finals', 'Final']
    
    const options = stages.map(stage => ({
        value: stage,
        selected: match.stage === stage? 'selected' : '',
    }));

    return options;
}

export async function create(req, res) {
    const userId = req.user.id;
    try {
        const matchData = createMatchSchema.parse(req.body);
        
        await matchService.create(matchData, userId);
        res.redirect('/match/dashboard');
    } catch (err) {
        const errorMessage = getErrorMessage(err);
        const stageOptions = getStageOptions(req.body);

        return res.status(500).render('match/create', { err: errorMessage, match: req.body, stageOptions });
    }
}

export async function getDashboardPage(req, res) {
    const matches = await matchService.getAll();
    res.render('match/dashboard', { matches });
}

export async function showDetailsPage(req, res) {
    const matchId = req.params.matchId;
    const userId = req?.user?.id; 
    const match = await matchService.getById(matchId);

    if (!match) {
        return res.status(404).render('404', { error: 'No match found' });
    }

    const isOwner = match.userId === userId;
    const hasLiked = match.likedBy.some(user => user.id === userId);
    const likesCount = match.likedBy.length

    res.render('match/details', { match, isOwner, hasLiked, likesCount });
}

export async function hitLike(req, res) {
    const matchId = req.params.matchId;
    const userId = req.user.id;

    try {
        await matchService.hitLike(matchId, userId);

        res.redirect(`/match/${matchId}/details`);
    } catch (err) {
        const errorMessage = getErrorMessage(err);

        return res.status(400).render('404', { err: errorMessage });
    }

}

export async function removeMatch(req, res) {
    const matchId = req.params.matchId;
    const userId = req.user.id;

    const match = await matchService.getById(matchId);

    const isOwner = match.userId === userId;

    if (!isOwner) {
        return res.status(403).render('404', { error: 'You are not authorized to delete this match' });
    }

    await matchService.removeMatchById(matchId, userId);

    res.redirect('/match/dashboard');
}

export async function getEditPage(req, res) {
    const matchId = req.params.matchId;
    const userId = req.user.id;

    const match = await matchService.getById(matchId);
    const isOwner = match.userId === userId;

    if (!isOwner) {
        return res.status(403).render('404', { error: 'You are not authorized to edit this match' });
    }

    res.render('match/edit', { match });
}

export async function updateMatch(req, res) {
    const matchId = req.params.matchId;
    const userId = req.user.id;

    const match = await matchService.getById(matchId);
    const isOwner = match.userId === userId;

    if (!isOwner) {
        return res.status(403).render('404', { error: 'You are not authorized to edit this match' });
    }

    try {
        const matchData = createMatchSchema.parse(req.body);

        await matchService.update(matchId, matchData, userId);

        res.redirect(`/match/${matchId}/details`);  
    } catch (err) {
        const errorMessage = getErrorMessage(err);

        return res.status(400).render('match/edit', { err: errorMessage, match: req.body });
    }
}

export async function getReportPage(req, res) {
    try {
        const topScoredMatches = await matchService.getTopScoredMatches();
        res.render('match/report', { matches: topScoredMatches });
    } catch (err) {
        res.status(500).render('match/report', { hasError: true });
    }
}