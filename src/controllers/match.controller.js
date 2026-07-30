import { Router } from "express";
import { getErrorMessage } from "../utils/error.utils";
import { createMatchSchema } from "../schemas/match.schema.js";
import { matchService } from "../../services/index.js";

const matchController = Router();

export function getMatchPage(req, res) {
    res.render('match/create');
}

export async function create(req, res) {
    const userId = req.user.id;
    try {
        const matchData = createMatchSchema.parse(req.body);
        
        await matchService.create(matchData, userId);
        res.redirect('/match/dashboard');
    } catch (err) {
        const errorMessage = getErrorMessage(err)
        return res.status(500).render('match/create', { err: errorMessage, match: req.body });
    }
}

export async function getDashboardPage(req, res) {
    const matches = await matchService.getAll();
    res.render('match/dashboard', { matches });
}

export async function showDetailsPage(req, res) {
    const matchId = req.params.matchId;
    const match = await matchService.getById(matchId);

    if (!match) {
        return res.status(404).render('404', { error: 'No match found' });
    }
    res.render('match/details', {match});
}