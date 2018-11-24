# react-native-cedar-maps-autocomplete
Customizable `Cedar Maps` autocomplete component for iOS and Android React-Native apps

### Preview

![]()

### Installation

1. ```npm install react-native-cedar-maps-autocomplete --save```
...

### Example

```jsx
import React from 'react';
import { View, Image } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-cedar-maps-autocomplete';

```


### Styling

```CedarPlacesAutocomplete``` can be easily customized to meet styles of your  app. Pass styles props to ```CedarPlacesAutocomplete``` with style object for different elements (keys for style object are listed below)

| key | type |
| ---- | ---- |
| container | object (View) |
| description | object (Text style) |
| textInputContainer | object (View style) |
| textInput | object (style) |
| loader | object (View style) |
| listView | object (ListView style) |
| predefinedPlacesDescription | object (Text style) |
| poweredContainer | object (View style) |
| powered | object (Image style) |
| separator | object (View style) |
| row | object (View style) |


#### Example


```jsx
<CedarMapsAutocomplete
  
/>
```


### Features

- [x] Places autocompletion
- [x] iOS and Android compatibility


### Changelog
- 1.0.0 : Initial commit.



### License

[MIT](LICENSE)

### Authors

- [Mahdi Bashirpour](https://www.twitter.com/bashirpour)