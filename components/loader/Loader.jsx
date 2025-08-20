export const Loader = () => {
    return (
        <div className="flex flex-row gap-2 mt-40 items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-green-600 animate-bounce"></div>
            <div
                className="w-4 h-4 rounded-full bg-green-600 animate-bounce [animation-delay:-.3s]">
            </div>
            <div
                className="w-4 h-4 rounded-full bg-green-600 animate-bounce [animation-delay:-.5s]">
            </div>
            <div
                className="w-4 h-4 rounded-full bg-green-600 animate-bounce [animation-delay:-.7s]">
            </div>
        </div>
    );
}
