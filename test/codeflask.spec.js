const { test, expect } = require('@playwright/test');


////////////////////////////////////////////////////////////////////////////////

async function exists(page, selector) {
  const el =  page.locator(`.${selector}`)
  await expect(el).toHaveClass(new RegExp(selector))
}

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})

////////////////////////////////////////////////////////////////////////////////

test('smoke test', async ({ page }) => {
  const title = page.locator('h1')
  await expect(title).toHaveText('Testing below:');
})


test('should create editor elements',  async ({page}) => {
  await exists(page, 'codeflask')
  await exists(page, 'codeflask__pre')
  await exists(page, 'codeflask__textarea')
  await exists(page, 'codeflask__lines')
  const flatten = page.locator('.codeflask__flatten')
  await expect(flatten).toHaveCount(2)
})

test('should enable syntax highlight', async ({page}) => {
  const code_span = page.locator('.codeflask .token.punctuation')
  await expect(code_span.first()).toHaveClass('token punctuation')
})

test('should render lineNumbers', async ({page}) => {
  const lines = page.locator('.codeflask .codeflask__lines' )
  expect(await lines.count()).toBeGreaterThan(0)
  const line = page.locator('.codeflask .codeflask__lines__line' )
  expect(await line.count()).toBeGreaterThan(1)
});

test('should have same lineNumbers as lines of code', async ({page}) => {
  const text = page.locator('.codeflask__textarea')
  await text.fill('let it = "go";\nconst parrot = "bird";')
  const lines = page.locator('.codeflask .codeflask__lines' )
  expect(await lines.count()).toBeGreaterThan(0)
  const line = page.locator('.codeflask .codeflask__lines__line' )
  expect(await line.count()).toBe(2)
});

test('should update highlighting to reflect code', async ({page}) => {
  const text = page.locator('.codeflask__textarea')
  await text.fill('let it = "go";')
  const tokens = page.locator('.codeflask .token')
  await expect(tokens).toHaveClass([ 
    'token keyword',
    'token operator',
    'token string',
    'token punctuation',
  ])
})

test('.updateCode(): should update lineNumbers', async ({page}) => {
  await page.evaluate(() => { flask.updateCode("let age = 20"); })
  const lines = page.locator('.codeflask .codeflask__lines' )
  expect(await lines.count()).toBe(1)
})

test('.updateCode(): should update lineNumbers for multiple lines', async ({page}) => {
  await page.evaluate(() => { flask.updateCode("let age = 20\nlet lines = 2"); })
  const lines = page.locator('.codeflask .codeflask__lines .codeflask__lines__line' )
  expect(await lines.count()).toBe(2)
})

test('.onUpdate(): should execute callback upon user interaction', async ({page}) => {
  const text = page.locator('.codeflask__textarea')
  await text.fill('let it = "go";\nconst parrot = "bird";')
  await page.evaluate(() => { flask.onUpdate(code => document.title = code) });
  await text.fill('title = 99')
  const newTitle = await page.evaluate(() => document.title)
  expect(newTitle).toBe('title = 99')
})

test('should enable rtl when rtl: true', async ({page}) => {
   await page.evaluate(() => {

      const test_div = document.createElement('div');
      document.body.appendChild(test_div);
      new CodeFlask(test_div, { rtl: true });
    })
    const ta = page.locator('.codeflask__textarea[dir="rtl"]')
    expect(await ta.count()).toBe(1)
    const pre = page.locator('.codeflask__pre[dir="rtl"]')
    expect(await pre.count()).toBe(1)
})

test('should not enable rtl when rtl: false', async ({page}) => {
   await page.evaluate(() => {

      const test_div = document.createElement('div');
      document.body.appendChild(test_div);
      new CodeFlask(test_div, { rtl: false });
    })
    const ta = page.locator('.codeflask__textarea[dir="rtl"]')
    expect(await ta.count()).toBe(0)
    const pre = page.locator('.codeflask__pre[dir="rtl"]')
    expect(await pre.count()).toBe(0)
})

test('should not enable rtl when rtl not set', async ({page}) => {
   await page.evaluate(() => {
      const test_div = document.createElement('div');
      document.body.appendChild(test_div);
      new CodeFlask(test_div, { language: 'js' });
    })
    const ta = page.locator('.codeflask__textarea[dir="rtl"]')
    expect(await ta.count()).toBe(0)
    const pre = page.locator('.codeflask__pre[dir="rtl"]')
    expect(await pre.count()).toBe(0)
})

test('.getCode(): should return current code', async ({page}) => {
  const text = page.locator('.codeflask__textarea')
  await text.fill('return "my code here"');
  const result = await page.evaluate(() => flask.getCode());
  expect(result).toBe('return "my code here"');
})

test('should add an ID attribute with option', async ({page}) => {
   await page.evaluate(() => {
      const test_div = document.createElement('div');
     test_div.textContent = "'hello from test div'"
      document.body.appendChild(test_div);
      new CodeFlask(test_div, { areaId: 'thing2' });
    })
    const result = page.locator('#thing2')
    expect(await result.count()).toBe(1)
})

test('should add an aria-labelledby attribute with option', async ({page}) => {
   await page.evaluate(() => {
      const test_div = document.createElement('div');
     test_div.textContent = "'hello from test div'"
      document.body.appendChild(test_div);
      new CodeFlask(test_div, { ariaLabelledby: 'thing2' });
    })
    const result = page.locator('.codeflask__textarea[aria-labelledby="thing2"]')
    expect(await result.count()).toBe(1)
})

function createEditorWithOptions(options) {  // runs in browser
  document.body.innerHTML = '';
  const test_div = document.createElement('div');
  test_div.textContent = "'hello from test div'"
  document.body.appendChild(test_div);
  window.cf_test = new CodeFlask(test_div, options)
}

test('should set readonly attribute with option', async ({page}) => {
  await page.evaluate(createEditorWithOptions, { readonly: true })
  let result = page.locator('.codeflask__textarea[readonly]')
  expect(await result.count()).toBe(1)
})


test('should not set readonly attribute with readonly: false', async ({page}) => {
  await page.evaluate(createEditorWithOptions, { readonly: false })
    let result = page.locator('.codeflask__textarea[readonly]')
    expect(await result.count()).toBe(0)
})

test('should not set readonly attribute with no option', async ({page}) => {
  await page.evaluate(createEditorWithOptions, {  })
    let result = page.locator('.codeflask__textarea[readonly]')
    expect(await result.count()).toBe(0)
})

test('should remove readonly attribute via API', async ({page}) => {
  await page.evaluate(createEditorWithOptions, { readonly: true })

  let result = page.locator('.codeflask__textarea[readonly]')

  expect(await result.count()).toBe(1)
  await page.evaluate(() => window.cf_test.disableReadonlyMode())

  result = page.locator('.codeflask__textarea[readonly]')
  expect(await result.count()).toBe(0)
})

test('should add line when enter pressed', async ({page}) => {
  await page.evaluate(createEditorWithOptions, { lineNumbers: true })

  let lines = page.locator('.codeflask .codeflask__lines__line')
  expect(await lines.count()).toBe(1)
  await page.fill('textarea', 'x\n')
  lines = page.locator('.codeflask .codeflask__lines__line')
  expect(await lines.count()).toBe(2)
})

test('should not add line when enter pressed and readonly', async ({page}) => {
  await page.evaluate(createEditorWithOptions, { lineNumbers: true, readonly: true })

  let lines = page.locator('.codeflask .codeflask__lines__line')
  expect(await lines.count()).toBe(1)  // initial blank line
  await page.fill('textarea', 'x\n', { force: true })  // otherwise Playwright waits for it to become enabled
  lines = page.locator('.codeflask .codeflask__lines__line')
  expect(await lines.count()).toBe(1)
})

  // xit('should handle the tab key in the editor', function () {
  //   let flask_test
  //   browser.execute(() => {
  //     const test_div = document.createElement('div');
  //     document.body.appendChild(test_div);
  //     flask_test = new CodeFlask(test_div, { handleTabs: true });
  //   });
  //   $('.codeflask__textarea').setValue('hi\thello after');
  //   const code = browser.execute(() => { return flask.getCode(); });
  //   expect(code).to.be.equals('hi\thello after');
  // });

  // xit('should not handle the tab key in the editor with handleTabs=false option', function () {
  //   let flask_test
  //   browser.execute(() => {
  //     const test_div = document.createElement('div');
  //     document.body.appendChild(test_div);
  //     flask_test = new CodeFlask(test_div, { handleTabs: false });
  //   });
  //   $('.codeflask__textarea').setValue('hi before tab\thello after');
  //   const code = browser.execute(() => { return flask.getCode(); });
  //   expect(code).to.be.equals('hi before tab');
  // });
// });
