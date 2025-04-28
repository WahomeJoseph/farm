export const Loader = () => {
    return (
        <div className="flex flex-row gap-2 mt-40 items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-green-600 animate-pulse"></div>
            <div
                className="w-4 h-4 rounded-full bg-green-600 animate-pulse [animation-delay:-.3s]">
            </div>
            <div
                className="w-4 h-4 rounded-full bg-green-600 animate-pulse [animation-delay:-.5s]">
            </div>
            <div
                className="w-4 h-4 rounded-full bg-green-600 animate-pulse [animation-delay:-.7s]">
            </div>
        </div>
    );
}