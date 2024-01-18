import bodyParser from 'body-parser';
import express from 'express';
import morgan from 'morgan';
import Controller from './interfaces/controller.interface';
import { config } from './config'
import mongoose from 'mongoose';
import path from 'path';
import PostModel from "./models/PostModel";
import cors from 'cors';
import ChatController from 'controllers/chat.controller';



class App {
  public app: express.Application;
  io: Server;

  constructor(controllers: Controller[]) {
    this.app = express();
   this.httpServer = http.createServer(this.app);
   this.io = new Server(this.httpServer, {
       cors: {
           origin: 'http://localhost:5173', 
           methods: ['GET', 'POST'],
       },
   });
 
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.connectToDatabase();
    this.initializeSockets();
    this.serveStaticFiles(); // Add this line
 }
 
 public listen(): void {
  this.httpServer.listen(config.port, () => {
      console.log(`App listening on the port ${config.port}`);
  });
}


  private initializeMiddlewares(): void {
    this.app.use(bodyParser.json());
    this.app.use(morgan('dev'));
    this.app.use(cors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
        optionsSuccessStatus: 204,
        allowedHeaders: 'Content-Type,Authorization',
    }));
    this.app.use(express.static("'../../../build"));
 }
 
 private initializeSockets(): void {
  console.log('Sockets work');

  const chatController = new ChatController(this.io);
  chatController.initializeRoutes(this.app);
}

  private initializeControllers(controllers: Controller[]): void {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
    this.app.get('/posts', this.getPosts);
  }

  private serveStaticFiles(): void { // Add this method
    this.app.use(express.static(path.join(__dirname, '../../../build')));
  }

  private getPosts = async (req: express.Request, res: express.Response) => {
    try {
      const posts = await PostModel.find();
      res.render('posts', { posts });
    } catch (error) {
      console.error('Error while fetching posts:', error);
      res.status(500).json({ error: 'An error occurred while fetching posts' });
    }
  }
  
  private connectToDatabase(): void {
    mongoose.connect(config.databaseUrl);

    const db = mongoose.connection;

    db.on('error', (error: any) => {
        console.error('Error connection - MongoDB:', error);
    });
    db.once('open', () => {
      console.log('Connect with database established');
     });
  }
  
}
export default App;
