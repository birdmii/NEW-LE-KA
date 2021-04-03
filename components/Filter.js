import filterStyles from '../styles/Filter.module.css';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0.5),
  },
  formControlLabel: {
    marginBottom: -4,
    fontSize: 14,
  },
  formLabel: {
    fontSize: 12,
    color: '#2a2b2f',
  },
}));

const GreenCheckbox = withStyles({
  root: {
    color: '#c4c5ca',
    '&$checked': {
      color: '#32D89D',
      boxShadow: 'none',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const Filter = () => {
  const router = useRouter();
  const classes = useStyles();
  const [state, setState] = useState({
    daily: false,
    weekly: false,
    tendays: false,
    biweekly: false,
    monthly: false,
    free: false,
    charge: false,
  });

  const handleChange = async (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const handleQueryString = async (target) => {
    setState({ ...state, [target]: true });
  };

  useEffect(() => {
    let filterQueryString = router.query.filter;
    if (filterQueryString !== undefined) {
      let filterQueryArr = filterQueryString.split('|');
      filterQueryArr.map((filterItem) => {
        // handleQueryString(filterItem);
      });
    }

    const stateObj = state;
    let filterQuery = '';
    let searchQuery = router.query.q;
    Object.keys(stateObj).map((key) =>
      stateObj[key] === true ? (filterQuery += `${key}|`) : '',
    );
    filterQuery = filterQuery.substring(0, filterQuery.length - 1);
    if (filterQuery.length > 0) {
      //필터 쿼리와 검색 쿼리 모두 있을 때
      if (searchQuery !== undefined) {
        searchQuery = `?q=${searchQuery}`;
        filterQuery = searchQuery + '&filter=' + filterQuery;
        router.push(`/search${filterQuery}`);
      } else {
        //필터 쿼리만 있을 때
        filterQuery = '?filter=' + filterQuery;
        router.push(`/search${filterQuery}`);
      }
    }
  }, [state]);

  const { daily, weekly, tendays, biweekly, monthly, free, charge } = state;
  const error =
    [daily, weekly, tendays, biweekly, monthly, free, charge].filter((v) => v)
      .length !== 2;

  return (
    <div className={filterStyles.filterBoard}>
      <div>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel className={classes.formLabel}>발행 주기</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <GreenCheckbox
                  checked={daily}
                  onChange={handleChange}
                  name="daily"
                  className={classes.formLabel}
                />
              }
              label="매일"
              className={classes.formControlLabel}
            />
            <FormControlLabel
              control={
                <GreenCheckbox
                  checked={weekly}
                  onChange={handleChange}
                  name="weekly"
                  className={classes.formLabel}
                />
              }
              label="매주"
              className={classes.formControlLabel}
            />
            <FormControlLabel
              control={
                <GreenCheckbox
                  checked={tendays}
                  onChange={handleChange}
                  name="tendays"
                  className={classes.formLabel}
                />
              }
              label="10일"
              className={classes.formControlLabel}
            />
            <FormControlLabel
              control={
                <GreenCheckbox
                  checked={biweekly}
                  onChange={handleChange}
                  name="biweekly"
                  className={classes.formLabel}
                />
              }
              label="격주"
              className={classes.formControlLabel}
            />
            <FormControlLabel
              control={
                <GreenCheckbox
                  checked={monthly}
                  onChange={handleChange}
                  name="monthly"
                  className={classes.formLabel}
                />
              }
              label="매달"
              className={classes.formControlLabel}
            />
          </FormGroup>
        </FormControl>
      </div>
      <div className="mt-24">
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel className={classes.formLabel}>무료/유료</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <GreenCheckbox
                  checked={free}
                  onChange={handleChange}
                  name="free"
                  className={classes.formLabel}
                />
              }
              label="무료"
              className={classes.formControlLabel}
            />
            <FormControlLabel
              control={
                <GreenCheckbox
                  checked={charge}
                  onChange={handleChange}
                  name="charge"
                  className={classes.formLabel}
                />
              }
              label="유료"
              className={classes.formControlLabel}
            />
          </FormGroup>
        </FormControl>
      </div>
      {/* <div className="caption">발행 주기</div>
      <form action="" className="mt-8">
        <label className="body-text2">
          <input
            type="checkbox"
            name="daily"
            className={`${filterStyles.checkbox} mr-8`}
          />
          매일
        </label>
        <br />
        <label className="body-text2">
          <input type="checkbox" name="weekly" className="mr-8" />
          매주
        </label>
        <br />
        <label className="body-text2">
          <input type="checkbox" name="biweekly" className="mr-8" />
          격주
        </label>
        <br />
        <label className="body-text2">
          <input type="checkbox" name="monthly" className="mr-8" />
          매월
        </label>
        <br />
        <label className="body-text2">
          <input type="checkbox" name="10days" className="mr-8" />
          10일
        </label>
        <br />
      </form>

      <div className="caption mt-24">무료/유료</div>
      <form action="" className="mt-8">
        <label className="body-text2">
          <input type="checkbox" name="free" className="mr-8" />
          무료
        </label>
        <br />
        <label className="body-text2">
          <input type="checkbox" name="charge" className="mr-8" />
          유료
        </label>
        <br />
      </form> */}
    </div>
  );
};

export default Filter;
