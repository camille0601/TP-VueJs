import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import MultiStepForm from '../../components/form/MultiStepForm.vue'

beforeEach(() => {
  localStorage.clear()
})

describe('MultiStepForm', () => {
  it('navigates steps and saves review to localStorage', async () => {
    const wrapper = mount(MultiStepForm)
    const input = wrapper.find('input')
    await input.setValue('Mon titre')
    await wrapper.find('button').trigger('click') // next to step 2
    const textarea = wrapper.find('textarea')
    await textarea.setValue('Un super site')
    const buttons = wrapper.findAll('button')
    const nextBtn = buttons.find(b => b.text() === 'Suivant')
    if (nextBtn) await nextBtn.trigger('click')
    const submitBtn = wrapper.findAll('button').find(b => b.text() === 'Envoyer')
    if (submitBtn) await submitBtn.trigger('click')
    const reviews = JSON.parse(localStorage.getItem('reviews') || '[]')
    expect(reviews.length).toBe(1)
    expect(reviews[0].title).toBe('Mon titre')
  })
})
