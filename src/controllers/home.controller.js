import { matchService } from "../../services";

export async function getHomePage(req, res) {
    const matches = await matchService.getRecents();

    res.render('home', { matches });

}