import qs from "query-string";

class Utils {
    static queryStrfy(query) {
        return qs.stringify(
            { ...query },
            { skipNull: true, skipEmptyString: true })
    }
}

export default Utils;