import { Callback, NewsResponse, SourceResponse } from '../../types/index';

enum HTTPMethods {
    GET = 'GET',
}

interface Options {
    [key: string]: string;
}

class Loader {
    private baseLink: string;
    private options: Options;

    constructor(baseLink: string, options: Options) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp(
        { endpoint, options = {} }: { endpoint: string; options?: Options },
        callback: Callback = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load(HTTPMethods.GET, endpoint, callback, options);
    }

    private errorHandler(res: Response) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(options: Options, endpoint: string): string {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    public load(method: HTTPMethods, endpoint: string, callback: Callback, options = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => {
                if ('articles' in data) {
                    callback(data as NewsResponse);
                } else if ('sources' in data) {
                    callback(data as SourceResponse);
                } else {
                    throw new Error('Invalid response data');
                }
            })
            .catch((err) => console.error(err));
    }
}

export default Loader;
