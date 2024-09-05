import getLogger from "./logger.js";
import { networkInterfaces } from 'os';

const logger = getLogger();
const nets = networkInterfaces();

const name = `Home Network`;
if (!nets[ name ]){
	logger.error(`No network interface named ${name}`);
	process.exit(1);
}
const net = nets[ name ][ 0 ];
if (!net){
	logger.error(`No network interface named ${name}`);
	process.exit(1);
}
const ip_address = net.address;
logger.info(`IP Address: ${ip_address}`);