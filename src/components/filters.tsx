import { Checkbox, Collapse, Rate, Slider } from "antd";
import { useState } from "react";
import { CheckboxValueType } from "antd/es/checkbox/Group";

const { Panel } = Collapse;

interface FiltersProps {
  categories: string[];
  onChange: (categories: string, price: string) => void;
}

const Filters = (props: FiltersProps) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [prices, setPrices] = useState([0, 800]);
  const categoryOptions = props.categories.map((category) => ({
    label: category,
    value: category,
  }));

  const onCategoriesChange = (checkedValues: CheckboxValueType[]) => {
    setCategories(checkedValues as string[]);
    props.onChange(checkedValues.join(","), prices.join(","));
  };

  const handlePriceChange = (prices: number[]) => {
    setPrices(prices);
    props.onChange(categories.join(","), prices.join(","));
  };

  return (
    <Collapse accordion>
      <Panel header="Category" key="1">
        <Checkbox.Group
          options={categoryOptions}
          onChange={onCategoriesChange}
        />
      </Panel>
      <Panel header="Price" key="2">
        <Slider
          range
          min={0}
          max={800}
          defaultValue={[0, 800]}
          tooltip={{ open: true }}
          onChange={handlePriceChange}
        />
      </Panel>
    </Collapse>
  );
};

export default Filters;
