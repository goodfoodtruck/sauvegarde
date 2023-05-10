import { FunctionComponent } from "react"

export const FooterComponent: FunctionComponent = () => {
    return (
        <div className="flex flex-col md:flex-row justify-center mt-20 p-14 bottom-0 bg-black bg-opacity-20">
            <div className="m-2 text-center">
                <span className="font-sans text-xs">Powered by</span>
                <a href="https://www.igdb.com">
                    <svg className="w-10 m-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <title>icewind_logo</title>
                        <g id="Layer_1" data-name="Layer 1">
                            <path className="cls-1 fill-white" d="M86.85,200.25H107v91.49H86.85Z"/>
                            <path className="cls-1 fill-white" d="M131,246.26V246c0-26,20.25-47.31,48-47.31,16.47,0,26.4,4.44,35.94,12.54l-12.67,15.3c-7.06-5.89-13.33-9.28-23.92-9.28-14.64,0-26.27,12.93-26.27,28.49V246c0,16.73,11.5,29,27.71,29,7.32,0,13.85-1.83,18.95-5.48V256.46H178.47V239.07H218.2V278.8a59.35,59.35,0,0,1-39.08,14.51C150.63,293.31,131,273.32,131,246.26Z"/>
                            <path className="cls-1 fill-white" d="M242.78,200.25h35.68c28.75,0,48.62,19.74,48.62,45.49V246c0,25.75-19.87,45.74-48.62,45.74H242.78Zm20.12,18.17v55.16h15.56c16.46,0,27.57-11.11,27.57-27.32V246c0-16.21-11.11-27.58-27.57-27.58Z"/>
                            <path className="cls-1 fill-white" d="M350.21,200.25h42.48c10.46,0,18.69,2.88,23.92,8.11a21,21,0,0,1,6.27,15.55v.26c0,10.33-5.49,16.08-12,19.74C421.44,248,428,254.1,428,266.39v.26c0,16.73-13.59,25.09-34.24,25.09H350.21Zm52.67,27.06c0-6-4.7-9.41-13.2-9.41H369.82v19.34h18.56c8.88,0,14.5-2.87,14.5-9.67ZM393.08,254H369.82V274.1h23.92c8.88,0,14.24-3.14,14.24-9.93v-.26C408,257.76,403.41,254,393.08,254Z"/>
                            <path className="cls-1 fill-white" d="M476.9,364.09l-7.48-1.19a1353.31,1353.31,0,0,0-424,0l-7.47,1.19V152.93h439ZM257.41,333.26A1366.39,1366.39,0,0,1,464,349V165.86H50.86V349A1366.26,1366.26,0,0,1,257.41,333.26Z"/>
                        </g>
                    </svg>
                </a>
            </div>
            <div className="m-2 text-center">
                <span className="font-sans text-xs">Open-source</span>
                <a href="https://github.com/goodfoodtruck/sauvegarde">
                    <svg className="w-7 m-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
                        <path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="#fff"/>
                    </svg>
                </a>
            </div>
            <div className="my-auto">
                <span className="m-2 font-sans text-xs">
                    Inspired by <a href="https://letterboxd.com" className="font-bold text-white">Letterboxd</a> and <a href="https://www.backloggd.com" className="font-bold text-white">Backloggd</a> websites
                </span>
            </div>
        </div>
    )
}