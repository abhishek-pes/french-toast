# French Toast 🍞

**French Toast** is a customizable, reusable toast notification component built using Web Components. This project allows you to easily display toast messages in your web applications without relying on external libraries. The component is fully encapsulated using Shadow DOM and provides custom attributes to control its behavior.

## Features

- **Fully customizable**: Control the appearance, position, and behavior of the toast through HTML attributes.
- **Encapsulated design**: Styles and behavior are isolated using Shadow DOM.
- **Auto-dismiss**: Toast messages disappear automatically after a specified duration.

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/abhishek-pes/french-toast.git
   ```

2. Include the `frenchToast.js` script in your project:

   ```
   <script src="./frenchToast.js"></script>
   ```

## Usage

To use the **French Toast** component, add the `<french-toast>` custom element to your HTML, along with any desired attributes.

### Example

```
<french-toast id="toast-msg-1" duration="2000" open="false" placement="top right" type="success">
    This is a success toast message
</french-toast>

<french-toast id="toast-msg-2" duration="3000" open="false" placement="bottom center" type="warning">
    This is a warning toast message
</french-toast>
```

### Custom Attributes

| Attribute   | Type    | Description                                                                                  |
|-------------|---------|----------------------------------------------------------------------------------------------|
| `open`      | Boolean | Controls the visibility of the toast message. Set to `true` to display the toast.             |
| `type`      | String  | Defines the category of the toast. Options: `success`, `warning`, `error`, `default`.         |
| `duration`  | Number  | Sets the time (in milliseconds) for how long the toast should be visible before disappearing.  |
| `placement` | String  | Determines where the toast will appear on the screen. |

### Attributes in Detail

- **`open`**: This attribute controls whether the toast is shown. When set to `true`, the toast appears, and it will disappear after the specified duration.
  
  Example:
  ```
  <french-toast open="true">This is an open toast!</french-toast>
  ```

- **`type`**: Specifies the type of message to display. You can choose between `success`, `warning`, `error`, and `default`, each of which will apply a different style to the toast.

  Example:
  ```
  <french-toast type="success">This is a success message</french-toast>
  ```

- **`duration`**: Sets the time (in milliseconds) before the toast automatically disappears. By default, it is set to 2000ms (2 seconds).

  Example:
  ```
  <french-toast duration="3000">This toast will last 3 seconds</french-toast>
  ```

- **`placement`**: Defines where the toast appears on the screen. You can set it to combinations of `top` or `bottom`, and `left`, `right`, or `center`.

  Example:
  ```
  <french-toast placement="top right">This toast appears at the top-right corner</french-toast>
  ```

## License

This project is licensed under the MIT License.

## Contributing

Feel free to fork the project and submit pull requests! Contributions, suggestions, and bug reports are welcome.

## Author
- [Abhishek Mishra](https://github.com/abhishek-pes)
