import React from 'react';

const CategoryForm = ({handleSubmit, value, setValue}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter New Category"
            value={value}
            onChange={e => setValue (e.target.value)}
          />
        </div>
        <div className="align-item-center">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
