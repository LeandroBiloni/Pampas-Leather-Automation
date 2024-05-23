/**
 * Class for the URL Assembler
 */
export class URLAssembler{
    /**
     * Get an assembled URL
     * @param url The first half of the URL, example "http://localhost:8080/", "https://abc.xyz/"
     * @param route The route to access, example "myHomePage"
     * @returns An assembled URL, example "https://abc.xyz/myHomePage"
     */
    public static getAssembledURL(url: string, route: string): string {
        return url.concat(route);
    }
}