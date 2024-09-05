import { networkInterfaces } from "os";
import getLogger from "./logger.js";
import fs from 'fs';
const logger = getLogger();

const number_of_qr_codes = 10;

const url = `http://${get_local_IP()}:3000/`;

async function main(){
	for (let i = 0; i < number_of_qr_codes; i++){
		logger.info(`Creating QR Code ${i}`);
		const request = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURI(url + i)}&size=500x500`;
		logger.info(request);
		const res = await fetch(request);
		const buffer = await res.arrayBuffer();
		const qr_code = Buffer.from(buffer);
		fs.writeFileSync(`./qrs/qr_code_${i}.png`, qr_code);
	}
}

main();
// eslint-disable-next-line @typescript-eslint/naming-convention
function get_local_IP(): string{

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
	return ip_address;
}