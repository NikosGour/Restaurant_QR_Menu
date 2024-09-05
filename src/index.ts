import getLogger from "./logger.js";
import express, { Request } from "express";
import fs from "fs";

const logger = getLogger();
const app = express();
const port = 3000;

app.use(express.static(`static`));

app.get(`/:id`, (req:Request<{ id: number }>, res) => {
	logger.info(`GET /`);
	if (!req.params.id){
		res.status(400).send(`Bad Request`);
		return;
	}

	if (isNaN(req.params.id)){
		res.status(400).send(`Bad Request`);
		return;
	}

	const user_id = +req.params.id;

	let index_html:string = fs.readFileSync(`./static/index.html`, `utf-8`);
	index_html = index_html.replace(`{{user_id}}`, user_id.toString());
	logger.info(index_html);
	res.send(index_html);
});

app.listen(port, () => {
	logger.info(import.meta.dirname);
	logger.info(`Server is running on http://localhost:${port}`);
});