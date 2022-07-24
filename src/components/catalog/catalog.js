import React from "react";

import './catalog.css'

const Catalog = ({ categoriesList }) => {

    const catalogPage = 1;

    const CatalogColumn = ({ numItem }) => {
        const list = categoriesList.slice(numItem - 1, numItem + 9)

        const elements = list.map((item) => {

            return (
                <li className="catalogItem" key={item}>
                    {item}
                </li>
            );
        });

        return (
            <div>
                <ul>
                    {elements}
                </ul>
            </div>
        )

    }

    return (
            <div>
                <h2 className='catalogHeader'>Каталог</h2>
                <div className="catalog">
                    <CatalogColumn numItem={1 + (catalogPage - 1) * 30} />
                    <CatalogColumn numItem={11 + (catalogPage - 1) * 30} />
                    <CatalogColumn numItem={21 + (catalogPage - 1) * 30} />
                </div>
            </div>
    )
}

export default Catalog