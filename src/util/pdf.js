import * as pdfMake from 'pdfmake/build/pdfmake'
import * as pdfFonts from 'pdfmake/build/vfs_fonts'

const generateDocument = (skills) => ({
  content: [
    {
      text: 'Your Routine',
      style: 'header'
    },
    {
        text: 'Total difficulty: ' + (skills.reduce((acc, cur) => acc + parseFloat(cur.difficulty), 0).toFixed(1)),
        style: 'subheader'
    },
    {
      style: 'table',
      table: {
        widths: [300, '*', '*'],
        body: [
          [{text: 'Skill Name', bold: true}, {text: 'Difficulty/Tariff', bold: true}, {text: 'FIG Notation', bold: true}],
          ...skills.map(skill => [skill.name, skill.difficulty, skill.fig_shorthand])
        ]
      }
    },
    {
        text: 'Generated for free at https://trampoline.tom.network, tool designed and built by Tom Mitchelmore (https://tommitchelmore.com)',
        style: 'small'
    }
  ],
  styles: {
    header: {
      fontSize: 18,
      bold: true
    },
    subheader: {
      fontSize: 15,
      bold: true
    },
    table: {
      margin: [0, 5, 0, 15]
    },
    small: {
        fontSize: 8
    }
  }
})

const generatePdf = (skills) => 
  pdfMake.createPdf(
    generateDocument(skills),
    null,
    null,
    pdfFonts.pdfMake.vfs
  )

const pdf = {
  exportPdf: (skills) => {
    const pdf = generatePdf(skills)
    pdf.download('routine.pdf')
  },
  printPdf: (skills) => {
    const pdf = generatePdf(skills)
    pdf.print()
  }
}

export default pdf