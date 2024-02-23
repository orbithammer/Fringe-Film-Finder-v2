// This function takes an array of documents as input
const combineDocuments = (docs) => {
    // It maps over each document in the array
    // For each document, it extracts the 'pageContent' property
    // This results in a new array of page contents
    return docs.map((doc) => doc.pageContent)
    // It then joins all the page contents together into a single string
    // Each page content is separated by two newline characters
    .join("\n\n")
}

// The function is then exported
export {combineDocuments}
