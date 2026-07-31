import { Router } from 'express';
import { matchService } from '../../services';

const apiController = Router();

export async function getApi(req, res) {
    const topScoredMatches = await matchService.getTopScoredMatches();

    res.json(topScoredMatches);
}