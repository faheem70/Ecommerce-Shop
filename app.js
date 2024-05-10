const https = require(https);
const url = "https://jsonplaceholder.typicode.com/posts/";

const request = http.get(url, (response => {
    let data = ' ';
    response.on('data', (chunk) => {
        data += chunk;
    });
    response.on('end', () => {
        const posts = JSON.parse(data);
        console.log(posts);
    })
}));

request.on('error', (error) => {
    console.log(`Error fetching ${error.message}`);
});