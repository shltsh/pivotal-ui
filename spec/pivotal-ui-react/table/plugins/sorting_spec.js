import '../../spec_helper';
import {Table, withSorting} from '../../../../src/react/table';

describe('withSorting', () => {
  let data, ComposedTable;
  beforeEach(() => {
    data = [{
      attr1: 'row1-value1', attr2: 'row1-value2'
    }, {
      attr1: 'row2-value1', attr2: 'row2-value2'
    }];
    ComposedTable = withSorting(Table);
  });

  describe('with columns', () => {
    let columns;
    beforeEach(() => {
      columns = [{
        attribute: 'attr1', sortable: true
      }, {
        attribute: 'attr2', displayName: 'Display2'
      }];

      ReactDOM.render(<ComposedTable {...{columns, data, className: 'sorting-table'}}/>, root);
    });

    it('renders', () => {
      expect('.sorting-table').toExist();
    });

    describe('when there is a asc sort on a column', () => {
      beforeEach(() => {
        $('th:eq(0)').simulate('click');
      });

      it('sorts the data', () => {
        expect('tbody tr:eq(0) td:eq(0)').toHaveText(data[1].attr1);
        expect('tbody tr:eq(0) td:eq(1)').toHaveText(data[1].attr2);
        expect('tbody tr:eq(1) td:eq(0)').toHaveText(data[0].attr1);
        expect('tbody tr:eq(1) td:eq(1)').toHaveText(data[0].attr2);
      });

      describe('when the sort is desc sort on a column', () => {
        beforeEach(() => {
          $('th:eq(0)').simulate('click');
        });

        it('sorts the data', () => {
          expect('tbody tr:eq(0) td:eq(0)').toHaveText(data[0].attr1);
          expect('tbody tr:eq(0) td:eq(1)').toHaveText(data[0].attr2);
          expect('tbody tr:eq(1) td:eq(0)').toHaveText(data[1].attr1);
          expect('tbody tr:eq(1) td:eq(1)').toHaveText(data[1].attr2);
        });
      });
    });

    describe('when there is a sortOrder', () => {
      beforeEach(() => {
        ReactDOM.unmountComponentAtNode(root);
        const props = {columns, data, className: 'sorting-table', sortOrder: ['asc', 'desc']};
        ReactDOM.render(<ComposedTable {...props}/>, root);
      });

      it('sorts the data', () => {
        expect('tbody tr:eq(0) td:eq(0)').toHaveText(data[0].attr1);
        expect('tbody tr:eq(0) td:eq(1)').toHaveText(data[0].attr2);
        expect('tbody tr:eq(1) td:eq(0)').toHaveText(data[1].attr1);
        expect('tbody tr:eq(1) td:eq(1)').toHaveText(data[1].attr2);
      });

      describe('when the sort order is asc', () => {
        beforeEach(() => {
          $('th:eq(0)').simulate('click');
        });

        it('sorts the data', () => {
          expect('tbody tr:eq(0) td:eq(0)').toHaveText(data[1].attr1);
          expect('tbody tr:eq(0) td:eq(1)').toHaveText(data[1].attr2);
          expect('tbody tr:eq(1) td:eq(0)').toHaveText(data[0].attr1);
          expect('tbody tr:eq(1) td:eq(1)').toHaveText(data[0].attr2);
        });

        describe('when the sort order is desc', () => {
          beforeEach(() => {
            $('th:eq(0)').simulate('click');
          });

          it('sorts the data', () => {
            expect('tbody tr:eq(0) td:eq(0)').toHaveText(data[0].attr1);
            expect('tbody tr:eq(0) td:eq(1)').toHaveText(data[0].attr2);
            expect('tbody tr:eq(1) td:eq(0)').toHaveText(data[1].attr1);
            expect('tbody tr:eq(1) td:eq(1)').toHaveText(data[1].attr2);
          });

          describe('when the sort order is asc', () => {
            beforeEach(() => {
              $('th:eq(0)').simulate('click');
            });

            it('sorts the data', () => {
              expect('tbody tr:eq(0) td:eq(0)').toHaveText(data[1].attr1);
              expect('tbody tr:eq(0) td:eq(1)').toHaveText(data[1].attr2);
              expect('tbody tr:eq(1) td:eq(0)').toHaveText(data[0].attr1);
              expect('tbody tr:eq(1) td:eq(1)').toHaveText(data[0].attr2);
            });
          });
        });
      });
    });
  });

  describe('without columns', () => {
    beforeEach(() => {
      ReactDOM.render(<ComposedTable {...{data, className: 'sorting-table'}}/>, root);
    });

    it('renders', () => {
      expect('.sorting-table').toExist();
    });
  });

});