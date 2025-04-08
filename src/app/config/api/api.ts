import dotenv from 'dotenv';

dotenv.config();

//const BASE_URL =  "http://localhost:8082"; 
const BASE_URL = process.env.NEXT_PUBLIC_PROD;

export default BASE_URL;
