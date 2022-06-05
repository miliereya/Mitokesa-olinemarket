import s from './Catalog.module.css'

export const Catalog = () => {
    return (
        <section className={s.section}>
            <h2 className={s.heading}>New arrivals</h2>
            <p className={s.sub_heading}>Discover the latest arrivals on Nanushka.com, new-season pieces that explore our long-standing values of refined minimalism, comfort and functionality in timeless yet modern ways.</p>
            <button classNames={s.params}></button>
        </section>
    )
}