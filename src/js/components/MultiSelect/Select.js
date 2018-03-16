import React, { Component } from 'react';
import { FormDown } from 'grommet-icons';
import { Box, DropButton, Keyboard, TextInput } from 'grommet';

import MultiSelectContainer from './SelectContainer';
import doc from './doc';

class MultiSelect extends Component {
  state = { open: false }

  componentWillReceiveProps(nextProps) {
    const { onClose, value } = nextProps;
    const { open } = this.state;
    if (value !== this.props.value) {
      this.setState({ open: false });
      if (onClose && open) {
        onClose();
      }
    }
  }

  onOpen = () => {
    this.setState({ open: true });
  }

  onClose = () => {
    const { onClose } = this.props;
    this.setState({ open: false });
    if (onClose) {
      onClose();
    }
  }

  render() {
    const {
      a11yTitle, children, multiple, label, onClose, onChange, placeholder, plain, value,
      id, name, ...rest
    } = this.props;
    const { open } = this.state;
    const val = multiple && Array.isArray(value) && value.length === 1 ? value[0] : value;
    let selectLabel;
    if (typeof label === 'function') {
      selectLabel = label({ placeholder, value, onChange });
    } else {
      selectLabel = Array.isArray(val) ? val.join(', ') : val;
    }
    return (
      <Keyboard onDown={this.onOpen} onUp={this.onOpen}>
        <DropButton
          dropAlign={{ top: 'bottom', left: 'left' }}
          {...rest}
          onChange={onChange}
          open={open}
          onOpen={this.onOpen}
          onClose={this.onClose}
          a11yTitle={`${a11yTitle}${typeof selectLabel === 'string' ? `, ${selectLabel}` : ''}`}
          dropContent={<MultiSelectContainer {...this.props} />}
        >
          <Box
            aria-hidden={true}
            align='center'
            border={!plain ? 'all' : undefined}
            direction='row'
            justify='between'
          >
            {React.isValidElement(selectLabel) ? selectLabel : (
              <TextInput
                style={{ cursor: 'pointer' }}
                ref={(ref) => { this.inputRef = ref; }}
                {...rest}
                tabIndex='-1'
                id={id}
                name={name}
                type='text'
                placeholder={placeholder}
                plain={true}
                readOnly={true}
                value={selectLabel}
              />
            )}
            <Box
              margin={{ horizontal: 'small' }}
              flex={false}
              style={{ minWidth: 'auto' }}
            >
              <FormDown />
            </Box>
          </Box>
        </DropButton>
      </Keyboard>
    );
  }
}

if (process.env.NODE_ENV !== 'production') {
  doc(MultiSelect);
}

export default MultiSelect;
