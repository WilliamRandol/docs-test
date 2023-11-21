export default {
	async fetch(request, env, ctx) {
		/**
		 * Example someHost is set up to take in a JSON request
		 * Replace url with the host you wish to send requests to
		 * @param {string} someHost the host to send the request to
		 * @param {string} url the URL to send the request to
		 */
		const someHost = "https://github.com";
		const url = someHost + "/login/oauth/access_token";

		/**
		 * gatherResponse awaits and returns a response body as a string.
		 * Use await gatherResponse(..) in an async function to get the response body
		 * @param {Response} response
		 */
		async function gatherResponse(response) {
			const { headers } = response;
			const contentType = headers.get("content-type") || "";
			if (contentType.includes("application/json")) {
				return JSON.stringify(await response.json());
			}
			return response.text();
		}

		const params = Object.fromEntries(request.url.split('?')[1].split('&').map(p => p.split('=')));

		const requestOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=UTF-8",
				"Accept": "application/json",
			},
			body: JSON.stringify({
				client_id: "CLIENT_ID",
				client_secret: "CLIENT_SECRET",
				code: params.code,
			}),
		};

		const responseOptions = {
			headers: {
				"Content-Type": "application/json;charset=UTF-8",
				"Access-Control-Allow-Origin": "*",
      			"Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
      			"Access-Control-Max-Age": "86400",
			}
		}

		const response = await fetch(url, requestOptions);
		const results = await gatherResponse(response);
		return new Response(results, responseOptions);
	},
};
