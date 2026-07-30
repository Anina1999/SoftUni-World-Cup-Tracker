import { Router } from "express";

const matchController = Router();

export function getMatchPage(req, res) {
    res.render('match/create');
}