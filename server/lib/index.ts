import App from './app';
import IndexController from "./controllers/index.controller";
import PostController from "./controllers/PostController";
import DataController from "./controllers/DataController";
import LastDataController from "./controllers/LastDataController";

const app: App = new App([
    new LastDataController(),
    new DataController(),
    new PostController(),
    new IndexController(),
    
    
]);

app.listen();
