import React, { Component, PropTypes } from 'react'

class Lettering extends Component {
  /**
   * Prop validation of Lettering component
   */
  static propTypes = {
    // Text to lettering
    children: PropTypes.string.isRequired,
    // CSS class for father element
    className: PropTypes.string,
    // Available lettering modes
    type: PropTypes.oneOf(['char', 'word', 'line', 'all']),
    // CSS class for characters
    charClass: PropTypes.string,
    // CSS class for words
    wordClass: PropTypes.string,
    // CSS class for lines
    lineClass: PropTypes.string,
    // CSS spacer between css class type and index
    typeClassSpacer: PropTypes.string,
  }

  /**
   * Prop defaults of Lettering component
   */
  static defaultProps = {
    className: 'lettering',
    type: 'char',
    charClass: 'lettering__char',
    wordClass: 'lettering__word',
    lineClass: 'lettering__line',
    typeClassSpacer: '--',
  }

  /**
   * Default rules by lettering type
   */
  rules = {
    line: {
      split: '\\n',
      spacer: '',
    },
    word: {
      split: ' ',
      spacer: ' ',
    },
    char: {
      split: '',
      spacer: '',
    },
  }

  /**
   * Generate <span> element with the children
   * @param {PropTypes.node} children - Children
   * @param {string} type - Type of element
   * @param {number} index - Index position of element
   * @param {string} spacer - Space
   */
  getSpanElement(children, type, index, spacer) {
    const { charClass, wordClass, lineClass, typeClassSpacer } = this.props
    const childrenClasNames = { charClass, wordClass, lineClass }
    const className = childrenClasNames[`${type}Class`]
    const key = `${className}${typeClassSpacer}${index}`

    return (
      <span key={key} className={`${className} ${key}`} aria-hidden="true">
        {children}{spacer}
      </span>
    )
  }

  /**
   * Lettering by type
   * @param {string} children -
   * @param {string} type -
   * @param {function} [callback] -
   */
  letteringByType(children, type, callback) {
    const { split, spacer } = this.rules[type]
    const items = children.split(split)
    const single = (item, index) => this.getSpanElement(item, type, index, spacer)

    return items.map(callback ? single : callback)
  }

  /**
   * Lettering by all types
   */
  letteringAll = () =>
    this.letteringByType(this.props.children, 'line', lineItem =>
      this.letteringByType(lineItem, 'word', wordItem =>
        this.letteringByType(wordItem, 'char')
      )
    )

  /**
   * Render
   */
  render() {
    const { children, type, className } = this.props
    const makeLettering = type === 'all'
      ? this.letteringAll()
      : this.letteringByType(children, type)

    return <span className={className} aria-label={children}>{makeLettering}</span>
  }
}

export default Lettering
