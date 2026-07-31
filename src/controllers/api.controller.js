import { Router } from 'express';

const apiController = Router();

export function getReportPage(req, res) {
    res.render('match/report');
}