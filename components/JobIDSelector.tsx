import { Select, Divider, Input, Button } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';

const { Option } = Select;

function JobIDSelector(props: {
  onSelectorChange: (value: Array<string>) => void,
  careerPage?: string,
}) {
  const [items, setItems] = useState<Array<string>>([])
  const [name, setName] =  useState<string>('')

  const addItem = () => {
    if (name == null || name.length === 0) {
      return
    }
    setItems([...items, name])
    setName('')
  };

  return (
    <div style={{display: 'flex', width: '100' }}>
      <Select
        mode="multiple"
        placeholder="Job IDs or names you're interested"
        onChange={props.onSelectorChange}
        dropdownRender={menu => (
          <div>
            {menu}
            <Divider style={{ margin: '4px 0' }} />
            <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
              <Input 
                style={{ flex: 'auto' }} 
                value={name} 
                onChange={event => {
                    setName(event.target.value)
                }} />
              <Button
                type="link"
                style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                onClick={addItem}
              >
                <PlusOutlined /> Add Job ID
              </Button>
            </div>
          </div>
        )}
      >
        {items.map(item => (
          <Option key={item} value={item}>{item}</Option>
        ))}
      </Select>
      <Button
        style={{marginLeft: 2}}
        type="primary" 
        onClick={() => props.careerPage && window.open(props.careerPage)}>
          <SearchOutlined />
      </Button>
    </div>
  );
}

export default JobIDSelector
