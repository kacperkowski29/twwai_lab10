import Controller from '../interfaces/controller.interface';
import {Request, Response, NextFunction, Router} from 'express';
import DataModel from "../models/DataModel";

class LastDataController implements Controller {
    public path = '/api/data/last';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this
            .router
            .post(this.path, this.addData);
        this
            .router
            .get(this.path, this.getData);
    }

    private addData = async (request : Request, response : Response) => {
        const {pressure, temperature, humidity, date} = request.body;

        try {
            const newData = new DataModel({pressure, temperature, humidity, date});
            await newData.save();
            response
                .status(201)
                .json(newData);
        } catch (error) {
            console.error('Błąd podczas zapisywania danych:', error);
            response
                .status(500)
                .json({error: 'Wystąpił błąd podczas zapisywania posta'});
        }
    };

    private getData = async (request : Request, response : Response) => {
        try {
            const data = await DataModel.findOne().sort({'_id':-1}).limit(1);
            response
                .status(200)
                .json(data);
        } catch (error) {
            console.error('Błąd podczas pobierania danych:', error);
            response
                .status(500)
                .json({error: 'Wystąpił błąd podczas pobierania danych'});
        }
    };
}

export default LastDataController;