const { useEffect } = require("react")

function useTitle(title) {
    useEffect(() => {
        document.title = `${title} - Mobile Planet`
    }, [title])
}


export default useTitle;
