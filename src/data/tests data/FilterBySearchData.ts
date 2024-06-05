/**
 * Class for Orders Page - Filter By search test data
 */
export class FilterBySearchData {
    public filterName: string;
    public filterOption: string;
    public filterText: string;

    /**
     * Class constructor
     */
    constructor(filterName: string, filterOption: string, filterText: string) {
        this.filterName = filterName;
        this.filterOption = filterOption;
        this.filterText = filterText;
    }
}