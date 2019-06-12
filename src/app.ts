import express, { Application, Response, Request, NextFunction } from 'express';

const app: Application = express();

app.get('/', (req: Request, res: Response, next: NextFunction) => {
	res.send("It's Works");
});
app.listen(5000, () => console.log("Hi There, It's me 5000"));
