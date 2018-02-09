# API Basejump: URL Shortener Microservice
### By Carmen Chapa


User stories:

+ I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.
+ If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.
+  When I visit that shortened URL, it will redirect me to my original link.

## Example Usage:

```
https://carmen-chapa-fcc-url-shortener.glitch.me/new/http://www.google.com

https://carmen-chapa-fcc-url-shortener.glitch.me/new/http://foo.com:80
```

## Example Output:

```
{
original_url: "http://www.google.com",
short_url: "https://carmen-chapa-fcc-url-shortener.glitch.me/29142a"
}
```