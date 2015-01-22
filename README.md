OpenOnderwijsAPI-js
===================

This is the Javascript API used for communicating with the Open Educational API from SURFnet.

Because of the Same-origin policy, the application should be run from the same domain as the API or use a proxy to forward calls to the real API domain.

## Demo

There's a demo included, which shows an example in how to use the library. To run it:

* If you're running the reference python server (https://github.com/SURFnet/OpenOnderwijsAPI) on localhost:8000:
    * No need to do anything, just run index.html
* If you're running the api somewhere else: 
    * edit demo/app.js 
    * add your API endpoint in the placeholder near the top of the file. (the one that says <your endpoint url here>).
    * browse demo/index.html in a browser.

## General Usage

To use the library in a project, you would typically follow these steps:

1. Start by including the onderwijsdata.min.js file in your page:

    ```html
    <script src="onderwijsdata.min.js" type="text/javascript"></script>
    ```

2. Create a new onderwijsdata object:

    Take a look a the [API documentation](https://github.com/SURFnet/OpenOnderwijsAPI), for more information on how to generate an OAuth access token.
   

    ```javascript
    var onderwijsData = new Surfnet.OnderwijsData("<your endpoint URL>, <OAuth access token>");
    ```
 
3. Ask for the client you're interested in, example:
    ```javascript
    var personClient = onderwijsData.createPersonClient();
    var buildingClient = onderwijsData.createBuildingClient();
    ```
    
4. Use one of the three methods, to get data:
    
    ```javascript
    getList(params, callback) // Get first result set from API
    get(url, params, callback) // Get one entity by using an API provided url
    getById(id, params, callback) // Get one entity by using an id
    ```

    ```javascript
    personClient.getList(function (error, data) {
      if (data != null) {
        // do something with the data
      }
    })
    
    personClient.getList({someParameter: "someValue"}, function (error, data) {
      if (data != null) {
        // do something with the data
      }
    })
    ```

## Special cases

Some clients have extra methods to retrieve specific data:
#### Schedule:
```javascript
var scheduleClient = onderwijsData.createScheduleClient();
getByOwner(url, paramaters, callback);
getByPersonId(id, paramaters, callback);
getByRoomId(id, paramaters, callback);
```

#### Course result:
```javascript
var courseResultClient = onderwijsData.createCourseResultClient();
getByOwner(url, paramaters, callback);
getByPersonId(id, paramaters, callback);
```

#### Test result:
```javascript
var testResultClient = onderwijsData.createTestResultClient();
getByOwner(url, paramaters, callback);
getByPersonId(id, paramaters, callback);
```

``` getByOwner ``` is used to pass in a URL reference from the entity you want the related data from:
```javascript
// Example URL from the persons API data
var personUrl = "http://localhost:8000/persons/2";
scheduleClient.getByOwner(personUrl, null, function (error, data) {});
```

## Contributing

You're welcome to contribute to this code by making pull requests.
The source is located in the lib folder. Don't forget to also update the demo (if necessary) so we always have a working example.

To minify the Javascript files use the Google Closure Compiler, available at http://dl.google.com/closure-compiler/compiler-latest.zip

Run from the commandline, inside the "/lib/onderwijsdata/" folder
```
cat ./onderwijsdata.js ./tools.js $(ls models/*.js) | java -jar ./compiler.jar --js_output_file onderwijsdata.min.js
```
