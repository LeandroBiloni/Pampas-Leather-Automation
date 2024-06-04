/**
 * Class for Orders Page - Filter By State test data
 */
export class FilterByStateData {
    public stateOption: string;
    public expectedOrderState: string;

    /**
     * Class constructor
     */
    constructor(stateOption: string, expectedState: string) {
        this.stateOption = stateOption;
        this.expectedOrderState = expectedState;
    }
}