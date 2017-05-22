import React from 'react';
import { Card, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

class ProjectCards extends React.Component {
  getLangIcon(lang) {
    switch (lang) {
      case 'python':
        return (
          <div>
            <Icon>
              <i className="devicon-python-plain" />
            </Icon>
            Python
          </div>
        );
      case 'go':
        return (<i className="devicon-go-plain" />);
      case 'nodejs':
        return (<i className="devicon-nodejs-plain" />);
      case 'wordpress':
        return (<i className="devicon-wordpress-plain" />);
      case 'php':
        return (<i className="devicon-php-plain" />);
      case 'java':
        return (<i className="devicon-java-plain" />);
      case 'ruby':
        return (<i className="devicon-ruby-plain" />);        
      default:
        return ('');
    }
  }

  render() {
    return (
      <Card>
        <Card.Content header={this.props.name} />
        <Card.Meta content={this.props.tags} />
        <Card.Content description={this.props.description} />
        <Card.Content extra>
          {this.getLangIcon(this.props.lang)}
        </Card.Content>
      </Card>
    );
  }
}

ProjectCards.propTypes = {
  name: PropTypes.string,
  lang: PropTypes.string,
  description: PropTypes.string,
  tags: PropTypes.string,
};

ProjectCards.defaultProps = {
  name: '',
  lang: '',
  description: '',
  tags: '',
};

export default ProjectCards;
