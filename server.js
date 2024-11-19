const http = require("http");
const url = require("url");
const fs = require("fs/promises");

http
  .createServer(async (req, res) => {
    const { url: myurl } = req;
    const q = url.parse(myurl);

    if (q.pathname === "/pages") {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end("about \n sports");
      return;
    }

    if (q.pathname === "/pages/about") {
      try {
        const content = await getPage("about.html");
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(content);
      } catch (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.write(err);
        res.end("404 not found");
      }
      return;
    }
    if (q.pathname === "/pages/sports") {
      try {
        const content = await getPage("sports.html");
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(content);
      } catch (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.write(err);
        res.end("404 not found");
      }
      return;
    }

    if (q.pathname === "/files") {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end("people \n shops");
      return;
    }

    if (q.pathname === "/files/shops") {
      try {
        const content = await getPage("shops.txt");
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(content);
      } catch (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.write(err);
        res.end("404 not found");
      }
      return;
    }

    if (q.pathname === "/files/people") {
      try {
        const content = await getPage("people.txt");
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(content);
      } catch (err) {
        res.writeHead(404, { "Content-Type": "text/html" });
        res.write(err);
        res.end("404 not found");
      }
      return;
    }

    if (q.pathname.includes("/contacts")) {
      if ((q.pathname === "/contacts")) {
        try {
          const content = await getPage("contacts.json");
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(content);
        } catch (err) {
          res.writeHead(404, { "Content-Type": "text/html" });
          res.write(err);
          res.end("404 not found");
        }
        return;
      }
      else{
        const id= parseInt(q.pathname.split("/")[2]);
        try {
            const content = await getPage("contacts.json");
            
            const parsedContent= JSON.parse(content);
            const obj= parsedContent[id-1];
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(obj));
          } catch (err) {
            res.writeHead(404, { "Content-Type": "text/html" });
            res.write(err);
            res.end("404 not found");
          }
          return;
      }
    }
    

    if(q.pathname.includes("/comps/")){
        if (q.pathname === "/comps") {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("prime \n factorial");
        return;
        }
        else{
            const n= parseInt(q.pathname.split("/")[3]);
            if(typeof n==="NaN"){
                res.writeHead(404, { "Content-Type": "text/html" });
                res.end("not a number");
                return;
            }
            if(q.pathname.split("/")[2]==="prime"){
                const primesStr= calcPrimes(n);
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(primesStr);
                return;

            }
            else if(q.pathname.split("/")[2]==="factorial"){
                const factorialStr= calcFactorial(n);
                res.writeHead(200, { "Content-Type": "text/html" });
                res.end(factorialStr);
                return;
            }

        }
    }
  })
  .listen(8082);

async function getPage(path) {
  try {
    return await fs.readFile(path);
  } catch (err) {
    return err.message;
  }
}

function calcPrimes(n){
    let str="";
    for(let i=1;i<n;i++){
        if(isPrime(i)) str+= ` ${i}`;
    }
    return str;
}

function isPrime(n) {
    for (let i = 2; i < n; i++) {
      if (n % i == 0) return false;
    }
    return true;
}

function calcFactorial(n){
    let fact=1;
    for(let i=n;i>1;i--){
        fact=fact*=i;
    }
    return fact.toString();
}
  
