import filterStyles from '../styles/Filter.module.css'

const Filter = () => {
  return (
    <div className={filterStyles.filterBoard}>
      <div className="caption">발행 주기</div>
      <form action="" className="mt-8">
        <label className="bodyText2">
          <input type="checkbox" name="daily" className={`${filterStyles.checkbox} mr-8`}/>
          매일
        </label>
        <br />
        <label className="bodyText2">
          <input type="checkbox" name="weekly" className="mr-8"/>
          매주
        </label>
        <br />
        <label className="bodyText2">
          <input type="checkbox" name="biweekly" className="mr-8"/>
          격주
        </label>
        <br />
        <label className="bodyText2">
          <input type="checkbox" name="monthly" className="mr-8"/>
          매월
        </label>
        <br />
        <label className="bodyText2">
          <input type="checkbox" name="10days" className="mr-8"/>
          10일
        </label>
        <br />
      </form>

      <div className="caption mt-24">무료/유료</div>
      <form action="" className="mt-8">
      <label className="bodyText2">
          <input type="checkbox" name="free" className="mr-8"/>
          무료
        </label>
        <br />
        <label className="bodyText2">
          <input type="checkbox" name="charge" className="mr-8"/>
          유료
        </label>
        <br />
      </form>
    </div>
  );
};

export default Filter;
