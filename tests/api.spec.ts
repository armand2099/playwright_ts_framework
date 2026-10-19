import {test, expect, type Page} from '@playwright/test'
import { Rest } from '../utils/rest';
import baseEnvironmentUrl from '../utils/baseUrl'

let rest: Rest;


test.beforeEach(async() => {
    rest = new Rest(baseEnvironmentUrl.demo.api);
});

test('Search for a phrase using DuckDuckGo API', async() => {
    const response = await rest.restGet("Playwright");

    expect(await rest.resResponseCode(response, 200)).toBe(true);

    expect (await rest.restFind(response, "Playwright")).toBe(true);

    await rest.dispose();

});