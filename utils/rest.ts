import { request, APIRequestContext, APIResponse } from '@playwright/test';

export class Rest {
    /*REST utilities library*/
    
    //Variable declaration
    readonly API_URL:string;
    private context?:APIRequestContext;

    readonly HEADERS = {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json"
    }

    constructor (api_url: string){
        this.API_URL = api_url
    }

    async apiContext(): Promise<APIRequestContext>{
        this.context = await request.newContext({
        baseURL: this.API_URL,
        extraHTTPHeaders: this.HEADERS,
        });
        return this.context;
    }

    async dispose(): Promise<void>{
        await this.context?.dispose();
    }

    async restGet(body: string): Promise<APIResponse> {
        const context = await this.apiContext();

        try {
            // Random wait time between 1.5 and 3 secs
            const delay = 1500 + (Math.random() * 1500);
            await new Promise(resolve => setTimeout(resolve, delay));

            const params = { q: body, format: 'json' };
        
            // Makes the GET request to the root path
            const response = await context.get('/', { 
                params: params, 
                timeout: 10000
            });

            return response;
        } catch (error) {
            console.error(`Playwright error while making GET request: ${error}`);
            throw error;
        }
    }

    async restFind(response: any, text: string): Promise<boolean>{
        //Searches a phrase in the rest response
        let textFound: boolean;
        const responseJson = await response.json();
        const header = responseJson.Heading;
        
        if ( header.toLowerCase() == text.toLocaleLowerCase()){
            textFound = true;
        } else {
            textFound = false;
        }

        console.log("Text | " + text + " | Found in header");
        return textFound;
    }

    async resResponseCode(response: any, code: number): Promise<boolean>{
        //Validates response status code
        let expectedResponse: boolean;
        if (response.status() == code){                        
            expectedResponse = true;
        } else {
            expectedResponse = false;
        }

        console.log("Status code: " + response.status());
        return expectedResponse;
        
    }
}