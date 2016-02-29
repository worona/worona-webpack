import worona from 'worona';
import React from 'react';

const ThemeSelector = ({ select, name }) => (
  <button onClick={() => select(name)}>{name}</button>
);

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { theme: 'none', selectedTheme: null };
  }

  select(name) {
    var self = this;
    if (name !== 'none') {
      self.setState({ theme: 'loading', selectedTheme: null });
      worona.load(`/static/${name}.js`, function() {
        setTimeout(() => {
          self.setState({ theme: name, selectedTheme: worona.themes[name] });
        }, 1000);
      });
    }
    else
      self.setState({ theme: name, selectedTheme: null });
  }

  render() {
    var Theme;
    if (this.state.theme === 'none') {
      Theme = () => <div>no theme</div>;
    } else if (this.state.theme === 'loading') {
      Theme = () => <div>loading...</div>;
    } else {
      const SelectedTheme = this.state.selectedTheme;
      Theme = () => <div><SelectedTheme /></div>;
    }
    return (
      <div>
        <ThemeSelector select={this.select.bind(this)} name="none" />
        <ThemeSelector select={this.select.bind(this)} name="theme1" />
        <ThemeSelector select={this.select.bind(this)} name="theme2" />
        <br />
        <Theme />
      </div>
    );
  }
}
