import express, { Application, Response, Request, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
export const app: Application = express();

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
	const bearerHeader: any = req.headers['authorization'];
	if (bearerHeader !== undefined) {
		const bearer = bearerHeader.split(' ');
		const bearerToken = bearer[1];
		req.body = {
			token: bearerToken,
		};
		next();
	} else {
		res.send({
			status: 403,
			message: 'Authorization Error!',
		});
	}
};
app.get('/api', (req: Request, res: Response, next: NextFunction) => {
	res.send("It's Works");
});

app.post('/api/post', verifyToken, (req: Request, res: Response, next: NextFunction) => {
	jwt.verify(req.body.token, 'secretkey', (err: any, authData: any) => {
		if (err) {
			res.send({
				status: 403,
				message: 'Authorization Error!',
			});
		} else {
			res.json({
				message: 'Post created!',
				authData,
			});
		}
	});
});

app.post('/api/login', (req: Request, res: Response, next: NextFunction) => {
	const user = {
		username: 'abdulrehman',
		email: 'ab@gmail.com',
	};
	jwt.sign({ user: user }, 'secretkey', { expiresIn: '20s' }, (err: any, token: any) => {
		console.log(err, token);
		res.json({ token: token });
	});
});

app.listen(5000, () => console.log("Hi There, It's me 5000"));
