export class URLAssembler{
    public static getAssembledURL(url: string, route: string): string {
        return url.concat(route);
    }
}