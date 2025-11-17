import {app} from '../src/app';
import ServerlessHttp from 'serverless-http';



export default  ServerlessHttp(app)