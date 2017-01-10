export function shuffle<T>(o: T[]): T[] {
    for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

export function getCell(table: Element, n: number): HTMLElement {
    return table['tBodies'][0].rows[n].cells[0];
}

export function removeAllChildren(el: Node) {
    let child: Node;
    while (child = el.firstChild) {
        el.removeChild(child);
    }
}

export function animateContentTransfer(sourceCell: HTMLElement, targetCell: HTMLElement, duration: number) {
    return new Promise(resolve => {
        const targetCellStyle = targetCell.style
        targetCellStyle.fontSize = '0px'
        targetCell.textContent = sourceCell.textContent
        const fakeCell = document.createElement('td')
        const fakeCellStyle = fakeCell.style
        fakeCellStyle.opacity = null
        fakeCellStyle.position = 'absolute'
        fakeCellStyle.backgroundRepeat = 'no-repeat'
        fakeCell.textContent = sourceCell.textContent
        const computedStyle = getComputedStyle(sourceCell)
        for (let s of ['width', 'border', 'padding', 'padding-left', 'background-position', 'background-image']) {
            fakeCellStyle[s] = computedStyle[s]
        }
        const sourceCellBox = sourceCell.getBoundingClientRect()
        fakeCellStyle.transform = `translate(${sourceCellBox.left}px, ${sourceCellBox.top}px)`
        fakeCellStyle.height = sourceCellBox.height - 5 + 'px'
        fakeCellStyle.borderColor = 'rgba(0,0,0,0)'
        fakeCellStyle.paddingTop = '3px'
        fakeCellStyle.backgroundColor = null
        document.body.appendChild(fakeCell)

        const targetCellBox = targetCell.getBoundingClientRect()
        fakeCellStyle.transition = `transform ${duration}ms ease-in-out`
        fakeCellStyle.transform = `translate3d(${targetCellBox.left}px, ${targetCellBox.top}px, 0px)`
        fakeCell.addEventListener('transitionend', e => {
            document.body.removeChild(fakeCell)
            targetCellStyle.fontSize = null
            targetCellStyle.backgroundImage = sourceCell.style.backgroundImage
            resolve()
        })
    })
}
