OpenOnderwijsAPI-js
===================

This is the Javascript API used for communicating with the Open Educational API from SURFnet.

### Usage
There's a demo included, which shows an example in how to use the library.

1. Start by including the onderwijsdate.min.js file in your page:

    ```html
    <script src="onderwijsdate.min.js" type="text/javascript"></script>
    ```

2. Create a new onderwijsdata object:

    ```javascript
    var onderwijsData = new Surfnet.OnderwijsData("<your endpoint URL>");
    ```

3. Ask for the client you're interested in, example:
    ```javascript
    var personClient = onderwijsData.personClient();
    var buildingClient = onderwijsData.buildingClient();
    ```
    
4. Use one of the three methods, to get data:
    
    ```javascript
    getList (params, callback) // Get first result set from API
    get (url, params, callback) // Get one entity by using an API provided url
    getById (id, params, callback) // Get one entity by using an id
    ```

    ```javascript
    personClient.getList(function (error, data) {
      if (data !=null) {
        // do something with the data
      }
    })
    
    personClient.getList({someParamater: "someValue"}, function (error, data) {
      if (data !=null) {
        // do something with the data
      }
    })
    ```


### Contributing

You're welcome to contribute to this code by making pull requests.
The source is located in the lib folder. Don't forget to also update the demo (if necessary) so we always have a working example.

To minify the Javascript files use the Google Closure Compiler, available at http://dl.google.com/closure-compiler/compiler-latest.zip

Run from the commandline, inside the "/lib/onderwijsdata/" folder
```
cat ./onderwijsdata.js ./tools.js $(ls models/*.js) | java -jar ./compiler.jar --js_output_file onderwijsdate.min.js
```

### License
