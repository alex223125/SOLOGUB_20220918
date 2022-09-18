module Services
  module Categories
    class Seed

      DEFAULT = ["Exercise", "Education", "Recipe"].freeze
      AMOUNT = 3

      def call
        if categories_present?
          #do nothing
        else
          seed
        end
      end

      private

      def categories_present?
        Category.all.where(title: DEFAULT).count == AMOUNT
      end

      def seed
        Category.transaction do
          DEFAULT.each do |category|
            Category.create!(title: category)
          end
        end
      end

    end
  end
end