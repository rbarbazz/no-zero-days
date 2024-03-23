import Alpine from 'alpinejs'
import { format, subDays, getTime } from 'date-fns'
import persist from '@alpinejs/persist'

Alpine.plugin(persist)

Alpine.data('lastSevenDays', () => ({
  days: [],

  init() {
    for (let i = 0; i < 7; i++) {
      const date = subDays(new Date(), i)
      date.setHours(0, 0, 0, 0)

      this.days.push(getTime(date))
    }
  },

  formatDate(date) {
    return format(date, 'EEEE')
  },
}))
Alpine.data('progress', function () {
  return {
    records: this.$persist({}),

    upsertRecord(day, value) {
      this.records[day] = parseInt(value)
    },

    getValue(day) {
      return this.records[day] || 0
    },

    getCurrentStreak() {
      let streak = []
      let day = new Date()
      day.setHours(0, 0, 0, 0)

      while (this.records[getTime(day)]) {
        streak.push(getTime(day))
        day = subDays(day, 1)
      }

      return streak
    },
  }
})

window.Alpine = Alpine
Alpine.start()
